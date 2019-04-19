# frozen_string_literal: true

module ResponseParser
  def render_success(resource, code = 200)
    s_class = resource.to_s
    if s_class.include? '::'
      s_class = s_class[/.*(?=::)/]
      serialization = ActiveModel::
                      Serializer::
                      CollectionSerializer.new(resource,
                                               each_serializer: "#{s_class}Serializer")
      render json: { status: 'success', data: serialization, code: code }
    else
      serialization = "#{resource.class.to_s}Serializer".constantize.new(resource)
      render json: { status: 'success', data: serialization, code: code }
    end
  end
end
