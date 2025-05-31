import { Loader } from "lucide-react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center py-10">
      <Loader className="h-6 w-6 animate-spin text-gray-500" />
    </div>
  );
};

export default Spinner;