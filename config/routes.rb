Spree::Core::Engine.add_routes do

  namespace :admin do
    resources :shipments
    post '/shipments/change_delivery_man', :to => 'shipments#change_delivery_man', :as => :admin_shipments_change_delivery_man
  	get '/shipments/shipment_delivery_man/:user_id', :to => 'shipments#shipment_delivery_man', :as => :admin_shipment_delivery_man
  end

end
