import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const WhoisForm = () => {
	const [domain, setDomain] = useState("");
	const [type, setType] = useState("domain");
	const [result, setResult] = useState(null);
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setResult(null);

		const loadingToast = toast.loading("Looking up...");

		try {
			const res = await axios.post(`${import.meta.env.VITE_API_URL}/whois`, {
				domain,
				type,
			});
			setResult(res.data);
			toast.success("Lookup successful!", { id: loadingToast });
		} catch (err) {
			const message = err.response?.data?.error || "An error occurred.";
			setError(message);
			toast.error(message, { id: loadingToast });
		}
	};

	return (
		<div className="max-w-md mx-auto mt-8">
			<form className="space-y-6" onSubmit={handleSubmit}>
				<section className="flex gap-2">
					<input
						type="text"
						value={domain}
						onChange={(e) => setDomain(e.target.value)}
						placeholder="Enter domain name"
						className="p-2 border w-full text-sm"
					/>
					<select
						value={type}
						onChange={(e) => setType(e.target.value)}
						className="p-2 border w-full text-sm">
						<option value="domain" className="bg-slate-700">
							Domain Information
						</option>
						<option value="contact" className="bg-slate-700">
							Contact Information
						</option>
					</select>
					<button
						type="submit"
						className="px-4 py-2 !bg-blue-600 text-white rounded">
						Lookup
					</button>
				</section>
			</form>

			{error && <p className="text-red-500 mt-4">{error}</p>}

			{result && (
				<div className="mt-6">
					<h2 className="text-lg font-semibold">Results</h2>
					<table className="mt-2 w-full text-left border">
						<tbody>
							{Object.entries(result).map(([key, value]) => (
								<tr key={key}>
									<td className="border px-2 py-1 font-medium">{key}</td>
									<td className="border px-2 py-1">
										{key === "hostnames"
											? Array.isArray(value)
												? value.join(", ").slice(0, 25) +
												  (value.join(", ").length > 25 ? "..." : "")
												: value || "N/A"
											: value || "N/A"}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default WhoisForm;
