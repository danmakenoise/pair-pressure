class Player < ActiveRecord::Base
  after_initialize :ensure_token

  belongs_to :game
  has_one :vote

  private

  def ensure_token
    unless self.player_token
      self.player_token = SecureRandom.urlsafe_base64
    end
  end
end
