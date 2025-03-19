const AdditionalServiceItem = ({ service, index, onUpdate, onDelete }) => {
	return (
		<div className="p-2 rounded-md mb-3">
			<div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
				<div className="flex-grow">
					<input
						type="text"
						value={service.name}
						onChange={(e) => onUpdate(index, { ...service, name: e.target.value })}
						placeholder="Include additional service"
						className="w-full p-2 border border-gray-300 rounded-md"
					/>
				</div>

				<div className="flex items-center gap-2">
					<span className="text-sm text-gray-500">for an extra</span>
					<div className="relative">
						<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
						<input
							type="number"
							value={service.price}
							onChange={(e) => onUpdate(index, { ...service, price: e.target.value })}
							className="w-[100px] pl-7 p-2 border border-gray-300 rounded-md"
						/>
					</div>
				</div>

				<div className="flex items-center gap-2">
					<span className="text-sm text-gray-500">and additional</span>
					<div className="relative">
						<input
							type="number"
							value={service.duration}
							onChange={(e) => onUpdate(index, { ...service, duration: e.target.value })}
							className="w-[100px] pl-7 p-2 border border-gray-300 rounded-md"
						/>
					</div>
					<span className="text-sm text-gray-500">day(s)</span>
				</div>

				<button
					type="button"
					onClick={() => onDelete(index)}
					className="text-red-500 hover:text-red-700 p-1"
					aria-label="Delete service"
				>
					<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path
							fillRule="evenodd"
							d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
							clipRule="evenodd"
						></path>
					</svg>
				</button>
			</div>
		</div>
	);
};

export default AdditionalServiceItem;
