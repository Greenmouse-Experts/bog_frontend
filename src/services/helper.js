import { BsDatabaseFillCheck } from "react-icons/bs";
import { MdOutlineCancel } from "react-icons/md";

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatChartNumber = (number) => {
  const val = Math.round(number)
  const num = val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return num
};

export const formatNgnNumber = (number) => {
  return `₦${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

export const getSubTotal = (items) => {
  const total = items.reduce((sum, data) => {
    return sum + data.amount ;
  }, 0);
  return total;
};

export const cutText = (text, count, insertDots) => {
  return (
    text.slice(0, count) + (text.length > count && insertDots ? "..." : "")
  );
};

export const stripHtml = (str) => {
  if (str === null || str === "") return false;
  else str = str.toString();

  // Regular expression to identify HTML tags in
  // the input string. Replacing the identified
  // HTML tag with a null string.
  return str.replace(/(<([^>]+)>)/gi, "");
};

export const getUserType = (type) => {
  switch (type) {
    case "admin":
      return "Super Admin";
    case "professional":
      return "Service Partner";
    case "vendor":
      return "Product Partner";
    case "private_client":
      return "Private Client";
    case "corporate_client":
      return "Corporate Client";
    case "all":
      return "All Users";
    case "product_partner":
      return "Product Partner";
    case "service_partner":
      return "Service Partner";
    default:
      return "";
  }
};
export const getStatus = (type) => {
  const val = type.toLowerCase()
  switch (val) {
    case "pending":
      return (
        <p className="px-2 py-1 text-yellow-700 bg-yellow-100 w-24 text-center rounded-md fw-600">
          Pending
        </p>
      );
    case "approved":
      return (
        <p className="px-2 py-1 text-green-700 bg-green-100 w-24 text-center rounded-md fw-600">
          Approved
        </p>
      );
    case "dispatched":
      return (
        <p className="px-2 py-1 text-blue-700 bg-blue-100 w-24 text-center rounded-md fw-600">
          Dispatched
        </p>
      );
    case "ongoing":
      return (
        <p className="px-2 py-1 text-orange-700 bg-orange-100 w-24 text-center rounded-md fw-600">
          Ongoing
        </p>
      );
    case "Ongoing":
      return (
        <p className="px-2 py-1 text-orange-700 bg-orange-100 w-24 text-center rounded-md fw-600">
          Ongoing
        </p>
      );
    case "declined":
      return (
        <p className="px-2 py-1 text-red-700 bg-red-100 w-24 text-center rounded-md fw-600">
          Declined
        </p>
      );
    case "cancelled":
      return (
        <p className="px-2 py-1 text-red-700 bg-red-100 w-24 text-center rounded-md fw-600">
          Cancelled
        </p>
      );
    case "completed":
      return (
        <p className="px-2 py-1 text-blue-700 bg-blue-100 w-24 text-center rounded-md fw-600">
          Completed
        </p>
      );
    case " Completed":
        return (
          <p className="px-2 py-1 text-blue-700 bg-blue-100 w-24 text-center rounded-md fw-600">
            Completed
          </p>
        );
    default:
      return "";
  }
};

export const paidStatus = (type) => {
  switch (type) {
    case "paid":
      return (
        <p className="flex text-green-600 fw-500 items-center gap-x-2">
          Paid <BsDatabaseFillCheck className="text-lg" />
        </p>
      );
    case "PAID":
      return (
        <p className="flex text-green-600 fw-500 items-center gap-x-2">
          Paid <BsDatabaseFillCheck className="text-lg" />
        </p>
      );
    case "successful":
      return (
        <p className="flex text-green-600 fw-500 items-center gap-x-2">
          Successful <BsDatabaseFillCheck className="text-lg" />
        </p>
      );
    default:
      return (
        <p className="flex text-red-600 fw-500 items-center gap-x-2">
          Not Paid <MdOutlineCancel />
        </p>
      );
  }
};

export const getUserTypeRevserse = (type) => {
  switch (type) {
    case "vendor":
      return "product_partner";
    case "professional":
      return "service_partner";
    case "private_client":
      return "private_client";
    case "corporate_client":
      return "corporate_client";
    case "all":
      return "All Users";
    case "product_partner":
      return "product_partner";
    case "service_partner":
      return "service_partner";
    default:
      return "";
  }
};

export const getProjectCategory = (type) => {
  switch (type) {
    case "land_survey":
      return "Land Survey";
    case "construction_drawing":
      return "Construction Drawing";
    case "building_approval":
      return "Building Approval";
    case "geotechnical_investigation":
      return "Geotechnical Investigation";
    case "contractor":
      return "Contractor";
    default:
      return "";
  }
};

export const formatServiceType = (type) => {
  switch (type) {
    case "quantity_surveyor":
      return "Quantity Surveyor";
    case "structural_engineer":
      return "Structural Engineer";
    case "architects":
      return "Architects";
    case "mechanical_engineer":
      return "Mechanical Engineer";
    case "Electrical Engineer":
      return "electrical_engineer";
      case "Surveyor":
        return "surveyor";
        case "Civil Engineer":
      return "civil_engineer";
    default:
      return "";
  }
};

export function calculatePercentage(amount, percent) {
  if (typeof amount !== 'number' || typeof percent !== 'number' || percent < 0) {
    return 'Invalid input';
  }

  return Math.round((amount * percent) / 100) + amount;
}

export function getPercentage(amount, percent) {
  if (typeof amount !== 'number' || typeof percent !== 'number' || percent < 0) {
    return 'Invalid input';
  }

  return Math.round((amount * percent) / 100);
}

export function multiplyStrings(...numbers) {
  let result = 1;

  for (let numStr of numbers) {
    // Use optional chaining to safely convert the string to a number
    const num = numStr ? parseFloat(numStr) : undefined;

    // Check if the conversion was successful and the value is a finite number.
    if (num !== undefined && !isNaN(num) && isFinite(num)) {
      // Multiply the number with the current result.
      result *= num;
    } else if (num !== undefined) {
      // Handle invalid input, like non-numeric strings.
      console.error(`Invalid number: ${numStr}`);
    }
  }

  return result;
}
export function addValues (...numbers) {
  let result = 0;

  for (let numStr of numbers) {
    // Use optional chaining to safely convert the string to a number
    const num = numStr ? parseFloat(numStr) : undefined;

    // Check if the conversion was successful and the value is a finite number.
    if (num !== undefined && !isNaN(num) && isFinite(num)) {
      // Multiply the number with the current result.
      result += num;
    } else if (num !== undefined) {
      // Handle invalid input, like non-numeric strings.
      console.error(`Invalid number: ${numStr}`);
    }
  }

  return result;
}







