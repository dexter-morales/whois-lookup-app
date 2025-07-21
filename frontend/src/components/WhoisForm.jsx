import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const fieldLabels = {
	domain: {
		domainName: "Domain Name",
		registrarName: "Registrar",
		createdDate: "Registration Date",
		expiresDate: "Expiration Date",
		estimatedDomainAge: "Estimated Domain Age",
		hostnames: "Hostnames",
	},
	contact: {
		registrantName: "Registrant Name",
		technicalContactName: "Technical Contact Name",
		administrativeContactName: "Administrative Contact Name",
		contactEmail: "Contact Email",
	},
};

const formatDate = (dateString) => {
	if (!dateString) return "N/A";
	try {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		}).format(date);
	} catch {
		return dateString;
	}
};

const getFormattedValue = (key, value) => {
	if (!value) return "N/A";

	if (key === "hostnames" && typeof value === "string") {
		return value.length > 25 ? value.slice(0, 25) + "..." : value;
	}

	if (["createdDate", "expiresDate"].includes(key)) {
		return formatDate(value);
	}

	return value;
};

const WhoisForm = () => {
	const [domain, setDomain] = useState("");
	const [type, setType] = useState("domain");
	const [result, setResult] = useState(null);
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setResult(null);
		setIsLoading(true);

		const loadingToast = toast.loading("Looking up...");

		try {
			const { data } = await axios.post(
				`${import.meta.env.VITE_API_URL}/whois`,
				{
					domain,
					type,
				}
			);
			setResult(data);
			toast.success("Lookup successful!", { id: loadingToast });
		} catch (err) {
			const message = err.response?.data?.error || "An error occurred.";
			setError(message);
			toast.error(message, { id: loadingToast });
		} finally {
			setIsLoading(false);
		}
	};

	const renderRows = () => {
		return Object.entries(fieldLabels[type]).map(([key, label]) => (
			<tr key={key}>
				<td className="border px-2 py-1 font-medium">{label}</td>
				<td className="border px-2 py-1">
					{getFormattedValue(key, result?.[key])}
				</td>
			</tr>
		));
	};

	const renderSkeletonRows = () => {
		return Object.entries(fieldLabels[type]).map(([key, label]) => (
			<tr key={key}>
				<td className="border px-2 py-1 font-medium">{label}</td>
				<td className="border px-2 py-1 w-42">
					<div className="h-4 bg-gray-200 animate-pulse rounded" />
				</td>
			</tr>
		));
	};

	return (
		<div className="max-w-md mx-auto mt-8">
			<form className="space-y-6" onSubmit={handleSubmit}>
				<section className="flex gap-2">
					<input
						type="text"
						value={domain}
						disabled={isLoading}
						onChange={(e) => setDomain(e.target.value)}
						placeholder="Enter domain name"
						className="p-2 border w-full text-sm"
					/>
					<select
						value={type}
						disabled={isLoading}
						onChange={(e) => {
							setType(e.target.value);
							setResult(null);
						}}
						className="p-2 border w-full text-sm cursor-pointer ">
						<option value="domain" className="bg-slate-500">
							Domain Information
						</option>
						<option value="contact" className="bg-slate-500">
							Contact Information
						</option>
					</select>
					<button
						type="submit"
						disabled={isLoading}
						className="px-4 py-2 bg-blue-600 text-white rounded">
						Lookup
					</button>
				</section>
			</form>

			{error && <p className="text-red-500 mt-4">{error}</p>}

			<div className="mt-6">
				<h2 className="text-lg font-semibold">Results</h2>
				<table className="mt-2 w-full text-left border">
					<tbody>{isLoading ? renderSkeletonRows() : renderRows()}</tbody>
				</table>
			</div>
		</div>
	);
};

export default WhoisForm;
