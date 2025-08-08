const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer group">
      <div className="card-body items-start">
        <div className="mb-4 text-white group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
        <h3 className="card-title text-xl">{title}</h3>
        <p className="text-gray-600 group-hover:text-white transition-colors duration-300">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
