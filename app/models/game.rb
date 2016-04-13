class Game < ActiveRecord::Base
  after_initialize :ensure_token
  validates :cards, presence: true

  has_many :votes, dependent: :destroy
  has_many :players, dependent: :destroy

  private

  def ensure_token
    unless self.token
      self.token = SecureRandom.hex(2)
    end
  end
end
