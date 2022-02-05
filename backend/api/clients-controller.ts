import ClientsDAO from "../dao/clientsDAO";

export default class ClientsController {
	static async apiGetClient(req: any, res: any, next: any) {
		const clientsPerPage = req.query.clientsPerPage
			? parseInt(req.query.clientsPerPage, 10)
			: 20;
		const page = req.query.page ? parseInt(req.query.page, 10) : 0;

		let filters: any = {};
		if (req.query.name) {
			filters.name = req.query.name;
		} else if (req.query.adress) {
			filters.adress = req.query.adress;
		} else if (req.query.cellphone) {
			filters.cellphone = req.query.cellphone;
		}

		const { clientsList, totalClients } = await ClientsDAO.getClients({
			filters,
			page,
			clientsPerPage,
		});

		let response = {
			restaurants: clientsList,
			page: page,
			filters: filters,
			entries_per_page: clientsPerPage,
			total_results: totalClients,
		};
		res.json(response);
	}
	static async apiGetClientById(req: any, res: any, next: any) {
		try {
			let id = req.params.id || {};
			let clients = await ClientsDAO.getClientByid(id);
			if (!clients) {
				res.status(404).json({ error: "Not found" });
				return;
			}
			res.json(clients);
		} catch (e) {
			console.log(`api, ${e}`);
			res.status(500).json({ error: e });
		}
	}
}
