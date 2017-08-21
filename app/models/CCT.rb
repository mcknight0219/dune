class CCT
  Q_URL = 'http://www.cctexpress.com/select/?num='

  def initialize(num)
    @num = num
  end

  def track
    r = HTTP.get Q_URL + @num
    return nil unless r.status.code == 200
    res = {}
    Nokogiri::HTML(r.to_s).css('tr').each do |e|
      if (cols = e.css('td')).count == 2 && valid_date?(cols.first.text)
        res[Date.parse(cols.first.text)] = cols.last.text.strip
      elsif (col = e.css('td')).count == 1
        unless (m = /[[:alnum:]]{13}/.match(col[0].text)).nil?
          @ems = m.to_s
        end
      end
    end
    res
  end

  private

  def valid_date?(d_str)
    begin
      Date.parse d_str
      true
    rescue ArgumentError
      false
    end
  end
end