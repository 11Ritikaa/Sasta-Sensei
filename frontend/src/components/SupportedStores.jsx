const SupportedStores = () => {
  const stores = [
    "Amazon",
  ];

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Supported Stores</h2>
      <ul className="list-disc pl-5">
        {stores.map((store, index) => (
          <li key={index} className="mb-2">{store}</li>
        ))}
      </ul>
    </div>
  );
};

export default SupportedStores;
