export async function load({ locals }: { locals: App.Locals }) {
	return {
		user: locals.user
	};
} 