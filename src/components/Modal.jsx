export const Modal = ({ isOpen, onClose, children , text }) => {
    if (!isOpen) return null;
    
return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <div className="display-flex">
            <span>{text}</span>
            <button 
            onClick={onClose}
            className="text-xl float-right display-block font-bold text-gray-600 hover:text-gray-900"
            >
            닫기
            </button>
        </div>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
    );
};
