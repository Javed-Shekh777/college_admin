const Certificate = ({ name, email, participated, date }) => {
  return (
    <div className="bg-white border-4 border-gray-300 rounded-lg shadow-xl p-10 max-w-3xl mx-auto text-center">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold uppercase text-gray-800">Indian Institute of Technology</h1>
        <p className="text-sm text-gray-600">Certificate of Participation</p>
      </div>

      {/* Body */}
      <div className="my-8">
        <p className="text-lg text-gray-700">This is to certify that</p>
        <h2 className="text-2xl font-bold text-blue-700 mt-2">{name || "Student Name"}</h2>
        <p className="mt-2 text-gray-700">{email || "student@example.com"}</p>

        <p className="mt-4 text-gray-700">
          has {participated ? "successfully participated" : "not participated"} in the academic program.
        </p>
        <p className="mt-2 text-gray-700">
          Awarded on <span className="font-semibold">{date || "DD/MM/YYYY"}</span> at <span className="font-semibold">IIT Delhi</span>.
        </p>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-10 text-sm text-gray-600">
        <div>
            <img src="/sig1.jpeg" alt="" className="h-15" />
          <p className="p-0 -ml-5">Director</p>
        </div>
        <div>
            <img src="/sig2.png" alt="" className="h-15" />
          <p className="p-0">Registrar</p>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
