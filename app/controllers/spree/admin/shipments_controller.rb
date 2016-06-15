module Spree
  module Admin
    class ShipmentsController < Spree::Admin::ResourceController
      before_action :load_data, only: [:index]
      def index
        if params[:shipments].present? && params[:shipments][:time].present?
          @time=Dish::TimeFrame.find(params[:shipments][:time])
        end
      end

      def load_data
        @time = Dish::TimeFrame.first
        @deliverers = Spree::User.deliverers
      end

      def change_delivery_man
        if params[:shipment_id] && params[:user_id]
          shipment = Spree::Shipment.find(params[:shipment_id])
          user = Spree::User.find(params[:user_id])
          unless shipment.nil? && user.nil?
            shipment.user_id = user.id
            if shipment.save
              render json: { success: "ok" }, status: 200
            else
              render json: { error: "Could not save" }, status: 400
            end
          end
        end
      end

      def capture
        if params[:user_id] && params[:amount]
          user = Spree::User.find(params[:user_id])
          amount = BigDecimal.new params[:amount]
          if(user.balance> amount)
            user.balance = user.balance - amount
            if user.save
              render json: { success: "ok" }, status: 200
            else
              render json: { error: "Could not save" }, status: 400

            end
          else
            render json: { error: "Could not save" }, status: 400
          end
        end
      end

      def edit
        @addresses = @shipment.address.to_string
      end

      def shipment_delivery_man
        if params[:user_id].present?
          @deliverer = Spree::User.find(params[:user_id])
          @shipments = Spree::Shipment.optimize @deliverer.shipments.date(Date.today)
          #@shipments = Spree::Shipment.optimize @deliverer.shipments
          @addresses = []
          unless @shipments.nil?
            @shipments.reverse
            @shipments.each do |shipment|
              @addresses << shipment.address.to_string
            end
            
          end
        end
      end



      private

        def find_resource
          if parent_data.present?
            parent.send(controller_name).find_by!(number: params[:id])
          else
            model_class.find_by!(number: params[:id])
          end
        end
    end
  end
end
