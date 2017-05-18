require 'csv'

class Package < ApplicationRecord
  belongs_to :user
  belongs_to :address
  has_many :package_items, dependent: :destroy
  before_save :default_values
  after_save  :make_serial_no

  attr_accessor :luxury

  def make_serial_no
    unless self.serial
      prefix = luxury ? 'SU' : 'AC'
      base = luxury ? 160000 : 180000
      self.update(:serial => prefix + (self.id.to_i + base).to_s)
    end
  end

  def status
    if is_shipped
      return 'shipped'
    elsif is_received
      return 'received'
    else
      return 'pending'
    end
  end
  
  def luxury?
    self.serial.start_with? 'SU'
  end

  def default_values
    self.is_shipped ||= false
    self.is_received ||= false
    self.is_cancelled ||= false
    self.luxury ||= false
  end

  @@CSV_HEADER_LUXURY = %w{ 单号 条码扫描 寄送电话 包裹内容 数量 单位 重量 姓名 地址 收件人电话 收件人城市 收件人身份证}
  @@CSV_HEADER_NORMAL = %w{ 单号 物品名称 规格 品牌 报单价（人民币） 数量 原价 重量 发货人姓名 收件人姓名 收件人身份证号码 收件人地址 收件人电话 邮编 城市名称}

  # Export items
  def to_csv(writer)
    is_first = true
    self.package_items.each do |it|
      line = if luxury?
               ['', '', "#{it.name}(#{it.brand})", it.quantity, it.article, '']
             else
               [it.name, it.specification, it.brand, '', it.quantity, '', '', '']
             end
      if is_first
        line.unshift serial
        if luxury?
          line += [address.name, address.address_line1, address.mobile, address.city, address.id_number]
        else
          line += [address.name, address.id_number, address.address_line1, address.mobile, address.post_code, address.city]
        end
        is_first = false
      else
        line.unshift ''
        if luxury?
          line += 5.times.map {|x| '' }
        else
          line += 6.times.map {|x| '' }
        end
      end
      writer << line
    end
  end

  def self.to_csv(filter: {})
    start_date = filter.fetch(:start_date, Date.new(2000, 1, 1)).beginning_of_day
    end_date = filter.fetch(:end_date, Date.today + 1).end_of_day
    if start_date == end_date 
      start_date = end_date.yesterday
    end
    
    luxury = filter.fetch(:luxury, false)  

    CSV.generate(headers: true) do |csv|
      csv << self.class_variable_get("@@CSV_HEADER_#{luxury ? 'LUXURY' : 'NORMAL'}".to_sym)
      Package.where("created_at >= :start_date AND created_at <= :end_date",
                  {start_date: start_date.to_s(:db), end_date: end_date.to_s(:db)})
              .select { |p| p.luxury? == luxury }
              .each do |p| 
                p.to_csv(csv)    
              end
    end
  end
end
