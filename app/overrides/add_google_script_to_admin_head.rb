Deface::Override.new(
  virtual_path: 'spree/layouts/admin',
  name: 'google_script',
  insert_bottom: 'head',
  partial: 'spree/admin/shipments/google_script'
)
