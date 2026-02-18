"use client";

const SUBJECT_OPTIONS = [
	{ value: "question", label: "Question" },
	{ value: "suggestion", label: "Suggestion" },
	{ value: "bug", label: "Bug Report" },
	{ value: "feedback", label: "General Feedback" },
	{ value: "other", label: "Other" },
];

export default function ContactForm() {
	const handleSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<section className="w-full px-4 py-6 sm:px-6 md:py-8">
			<div className="mx-auto w-full max-w-2xl rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 md:p-8">
				<h2 className="text-xl font-semibold text-gray-900 sm:text-2xl">Contact us</h2>
				<p className="mt-1 text-sm text-gray-600 sm:text-base">
					Send us your message and we&apos;ll get back to you.
				</p>

				<form onSubmit={handleSubmit} className="mt-6 space-y-5">
					<div>
						<label
							htmlFor="subject"
							className="mb-2 block text-sm font-medium text-gray-700"
						>
							Subject
						</label>
						<select
							id="subject"
							name="subject"
							defaultValue="question"
							className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
						>
							{SUBJECT_OPTIONS.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</select>
					</div>

					<div>
						<label
							htmlFor="message"
							className="mb-2 block text-sm font-medium text-gray-700"
						>
							Message
						</label>
						<textarea
							id="message"
							name="message"
							rows={6}
							placeholder="Write your message here..."
							className="block w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
						/>
					</div>

					<button
						type="submit"
						className="inline-flex w-full items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300 sm:w-auto"
					>
						Submit
					</button>
				</form>
			</div>
		</section>
	);
}
