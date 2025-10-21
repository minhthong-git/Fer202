import React, { useReducer } from 'react';
import { Button } from 'react-bootstrap';

// 1. Định nghĩa trạng thái ban đầu và reducer
const initialState = { isOn: false };

function reducer(state, action) {
    switch (action.type) {
        case 'toggle':
            // Trả về một đối tượng state mới với giá trị được đảo ngược
            return { isOn: !state.isOn };
        default:
            return state;
    }
}

function LightSwitch() {
    // 2. Sử dụng useReducer thay cho useState
    const [state, dispatch] = useReducer(reducer, initialState);
    
    // Hàm để gửi (dispatch) action 'toggle'
    const toggleLight = () => dispatch({ type: 'toggle' });

    // Style chung cho các button (giữ nguyên như bạn cung cấp)
    const buttonStyle = {  
        margin: '5px',
        padding: '10px 20px',
        borderRadius: '6px',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        fontSize: '16px'
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc' }}>    
            <h2>Công Tắc Đèn</h2>
            <p style={{ fontSize: '24px', fontWeight: 'bold' }}>
                {/* 3. Dùng state.isOn thay cho isLightOn */}
                Đèn hiện đang: {state.isOn ? 'Bật' : 'Tắt'}  
            </p>
            <Button
                onClick={toggleLight}  
                style={{ 
                    ...buttonStyle,
                    // 4. Dùng state.isOn cho logic style
                    background: state.isOn ? 'red' : 'green',
                    color: 'white'
                }}  
            >
                {/* 5. Dùng state.isOn cho nội dung button */}
                {state.isOn ? 'Tắt Đèn' : 'Bật Đèn'}  
            </Button>   
        </div>
    );
}

export default LightSwitch;