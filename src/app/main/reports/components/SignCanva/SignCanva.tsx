import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

interface ISignCanvaProps {
	onFirmaDrawn: (value: string) => void;
}

export default function SignCanva({ onFirmaDrawn }: ISignCanvaProps) {
	const [firmaData, setFirmaData] = useState(null);
	const signatureRef = useRef<any>(null);

	const clearFirma = () => {
		signatureRef.current.clear();
		setFirmaData(null);
	};

	const saveFirma = () => {
		const firmaDataURL = signatureRef.current.toDataURL();
		setFirmaData(firmaDataURL);
	};

	const handleFirmaDrawn = () => {
		onFirmaDrawn(signatureRef.current.getTrimmedCanvas().toDataURL());
	};

	return (
		<div>
			<SignatureCanvas
				ref={signatureRef}
				penColor="black"
				canvasProps={{ width: 400, height: 200, className: 'signature-canvas' }}
				onEnd={handleFirmaDrawn}
			/>
			<div>
				<button
					type="button"
					onClick={clearFirma}
				>
					Limpiar
				</button>
				<button
					type="button"
					onClick={saveFirma}
				>
					Guardar
				</button>
			</div>
		</div>
	);
}
