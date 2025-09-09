import './SuccessfulPaymentOverlay.css'

type SuccessfulPaymentOverlayProps = {
  onClose: () => void
}

const SuccessfulPaymentOverlay = ({ onClose }: SuccessfulPaymentOverlayProps) => {
  return (
    <div className="modal-overlay-wrapper">
      <div className="modal-overlay">
        <div className="modal">
          <p>Congratulations! Your purchase was successful.</p>
          <button onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
};

export default SuccessfulPaymentOverlay;