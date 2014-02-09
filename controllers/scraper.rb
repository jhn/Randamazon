require 'nokogiri'
require 'open-uri'
require 'json'

wish_list = ARGV[0]
doc = Nokogiri::HTML(open(wish_list))
items = []

doc.xpath('//*[starts-with(@id, "itemMain_")]').each do |e|
  id    = e.attributes['id'].content.slice(9..-1)
  name  = e.css("a#itemName_#{id}").text.strip
  price = e.css("span.a-size-base").text.strip
  link  = e.css("a#itemName_#{id}")[0]['href']

  item          = {}
  item['id']    = id
  item['name']  = name
  item['price'] = price
  item['link']  = link

  items << item
end

print items.to_json
