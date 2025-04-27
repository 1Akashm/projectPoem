import { Check, X } from "lucide-react";

const PasswordCriteria = ({ password }) => {
  const criteria = [
    { label: "At least 6 characters", met: password.length >= 6 },
    { label: "Should contain uppercase letter", met: /[A-Z]/.test(password) },
    { label: "Should contain lowercase letter", met: /[a-z]/.test(password) },
    { label: "Should contain a number", met: /\d/.test(password) },
    {
      label: "Should contain special character",
      met: /[^A-Za-z0-9]/.test(password),
    },
  ];

  return (
    <div className="pl-4 mt-8 mb-8 relative w-full">
      <ul className="flex flex-col gap-2 text-green-900 bg-slate-300 p-4 pl-1 text-shadow-2xs drop-shadow-xl rounded-lg">
        {criteria.map((item) => (
          <li key={item.label} className="flex items-center gap-2">
            {item.met ? (
              <Check className="text-green-400 size-4" />
            ) : (
              <X className="text-gray-400 size-4" />
            )}
            <span className={item.met ? "text-green-400" : "text-gray-400"}>
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const PasswordMeter = ({ password }) => {
  const getStrength = (pass) => {
    let strength = 0;
    if (pass.length >= 6) strength++;
    if (pass.match(/[A-Z]/) && pass.match(/[a-z]/)) strength++;
    if (pass.match(/\d/)) strength++;
    if (pass.match(/[^A-Za-z0-9]/)) strength++;
    return strength;
  };

  const strength = getStrength(password);

  const getStrengthColor = (strength) => {
    if (strength <= 1) return "bg-red-500";
    if (strength === 2) return "bg-yellow-400";
    if (strength === 3) return "bg-green-400";
    return "bg-green-600";
  };

  const getStrengthText = (strength) => {
    if(strength === 0) return "Very Weak"
    if (strength === 1) return "Weak";
    if (strength === 2) return "Fair";
    if (strength === 3) return "Good";
    return "Strong";
  };

  return (
    <div className="mt-4 w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-500 text-sm">Password strength</span>
        <span className="text-gray-500 text-sm">{getStrengthText(strength)}</span>
      </div>

      <div className="flex gap-2">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded-full transition-all duration-300 ${
              index < strength ? getStrengthColor(strength) : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export { PasswordMeter, PasswordCriteria };
