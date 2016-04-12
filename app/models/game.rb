class Game < ActiveRecord::Base
  after_initialize :ensure_token
  validates :cards, presence: true

  has_many :votes
  has_many :players
  
  private

  def ensure_token
    unless self.token
      self.token = SecureRandom.urlsafe_base64(2)
    end
  end
end
