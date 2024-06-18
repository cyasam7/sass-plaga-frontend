import React, { useRef } from 'react';
import SignaturePad from 'react-signature-canvas';

function SignaturaCanvas() {
	const ref = useRef({});

	return (
		<SignaturePad
			ref={ref}
			canvasProps={{
				className: 'signatureCanvas',
				style: {
					background: 'white'
				}
			}}
		/>
	);
}

export default SignaturaCanvas;
