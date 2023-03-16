module Authenticable
  extend ActiveSupport::Concern

  private

  def authenticate_user!
    unless user_signed_in?
      # if params[:SAMLResponse].present?
      #     response = OneLogin::RubySaml::Response.new(
      #       params[:SAMLResponse],
      #       :settings => saml_settings
      #     )
      #     if response.present?
      #       @email     = response.attributes['uid']
      #       @full_name = response.attributes['cn']
      #       @emp_id    = response.attributes['employeeNumber']
      #       @address   = response.attributes['ntUserDomainId']
      #       params.merge!({ emp_id: @emp_id, email: @email,full_name: @full_name,address:@address})
      #       user_sign_in!
      #     else
      #       raise response.errors.inspect
      #     end
      # else
      #     session[:RelayState] = request.url
      #     request = OneLogin::RubySaml::Authrequest.new
      #     redirect_to(request.create(saml_settings) , allow_other_host: true) 
      # end
      @email     = "abhar.p-k@hpe.com"
      @full_name = "Abhar"
      @emp_id    = "25038128"
      @address   = "pkab"
      params.merge!({ emp_id: @emp_id, email: @email,full_name: @full_name,address:@address})
      user_sign_in!
    end
  end

  def user_sign_in!
    user = User.find_or_initialize_by(emp_id: params['emp_id'])
    if user.new_record?
      user.full_name = params['full_name']
      user.email = params['email']
      user.address = params['address']
      user.save
      user.roles << Role.find_by_name("Normal User")
    end
    
    if session[:RelayState].present?
        sign_in(:user, user)
        redirect_to session[:RelayState]
    else
        sign_in(:user, user)
        redirect_to root_path
    end

  end

  def saml_settings
    settings = OneLogin::RubySaml::Settings.new

    # You provide to IDP
    settings.assertion_consumer_service_url = "https://#{request.host_with_port}"
    settings.idp_entity_id                  = "https://login-itg.ext.hpe.com"
    settings.sp_entity_id                   = "FYKE-NET"

    # IDP provides to you
    settings.idp_sso_target_url             = "https://login-itg.ext.hpe.com/idp/startSSO.ping?PartnerSpId=FYKE-NET"
    #settings.idp_cert                       = IDP_CERT
    settings.idp_cert                       = IDP_CERT_LOCAL

    settings
  end

end
