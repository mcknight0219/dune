module ApplicationHelper
  # TODO hacky, filmsy, need robust solution
  def set_active_class(link = nil)
    path = request.path

    if link.nil?
      return path.start_with?('/myorder', '/edit', '/login', '/profile')
    end

    if path == link
      return true
    end

    if link.size > 1 && path.size > 1
      link = "/#{link.split('/').second}"
      return path.start_with? link
    end

    false
  end
end
