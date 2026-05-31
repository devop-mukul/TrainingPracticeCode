import { useMemo, useState } from "react";
import {
	Box,
	Button,
	FormControl,
	InputAdornment,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Stack,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";

const rows = [
	{
		id: 1,
		car: "UP20BD8888 ( Category Not Mapped )",
		type: "own",
		driverName: "---",
		mapped: true,
		carCity: "Noida",
		carDispatchCenter: "All",
		driverCity: "Noida",
		driverDispatchCenter: "All",
	},
	{
		id: 2,
		car: "UP20BD8889 (Rover Range Rover Evoque)",
		type: "own",
		driverName: "Kunal Yadav(KY01)",
		mapped: true,
		carCity: "Noida",
		carDispatchCenter: "Center A",
		driverCity: "Noida",
		driverDispatchCenter: "Center A",
	},
	{
		id: 3,
		car: "UP20BD8786 (Rover Range Rover Evoque)",
		type: "own",
		driverName: "Rakesh Kumar(RK01)",
		mapped: true,
		carCity: "Delhi",
		carDispatchCenter: "Center B",
		driverCity: "Delhi",
		driverDispatchCenter: "Center B",
	},
	{
		id: 4,
		car: "01223453 ( Category Not Mapped )",
		type: "own",
		driverName: "---",
		mapped: false,
		carCity: "Noida",
		carDispatchCenter: "All",
		driverCity: "Noida",
		driverDispatchCenter: "All",
	},
	{
		id: 5,
		car: "MH01HJ9301 (Vellfire)",
		type: "own",
		driverName: "Select Driver",
		mapped: false,
		carCity: "Delhi",
		carDispatchCenter: "Center B",
		driverCity: "Delhi",
		driverDispatchCenter: "Center B",
	},
];

const cityOptions = ["All", "Noida", "Delhi"];
const dispatchOptions = ["All", "Center A", "Center B"];

export default function CardDriverMapping() {
	const [search, setSearch] = useState("");
	const [driverCity, setDriverCity] = useState("Noida");
	const [driverDispatchCenter, setDriverDispatchCenter] = useState("All");
	const [carCity, setCarCity] = useState("All");
	const [carDispatchCenter, setCarDispatchCenter] = useState("All");
	const [activeTab, setActiveTab] = useState("mapped");
	const [isFilterApplied, setIsFilterApplied] = useState(false);

	const filteredRows = useMemo(() => {
		return rows.filter((row) => {
			if (activeTab === "mapped" && !row.mapped) return false;
			if (activeTab === "unmapped" && row.mapped) return false;

			if (!isFilterApplied) {
				return row.car.toLowerCase().includes(search.toLowerCase());
			}

			const matchSearch = row.car.toLowerCase().includes(search.toLowerCase());
			const matchDriverCity = driverCity === "All" || row.driverCity === driverCity;
			const matchDriverDispatch =
				driverDispatchCenter === "All" ||
				row.driverDispatchCenter === driverDispatchCenter;
			const matchCarCity = carCity === "All" || row.carCity === carCity;
			const matchCarDispatch =
				carDispatchCenter === "All" || row.carDispatchCenter === carDispatchCenter;

			return (
				matchSearch &&
				matchDriverCity &&
				matchDriverDispatch &&
				matchCarCity &&
				matchCarDispatch
			);
		});
	}, [
		activeTab,
		carCity,
		carDispatchCenter,
		driverCity,
		driverDispatchCenter,
		isFilterApplied,
		search,
	]);

	return (
		<Box sx={{ p: 3, bgcolor: "#f3f3f3", minHeight: "100vh" }}>
			<Stack
				direction={{ xs: "column", sm: "row" }}
				justifyContent="space-between"
				alignItems={{ xs: "flex-start", sm: "center" }}
				spacing={2}
			>
				<Stack direction="row" spacing={1} alignItems="center">
					<PersonIcon sx={{ color: "#7f8c8d" }} />
					<Typography variant="h4" sx={{ color: "#18a690", fontSize: "2rem" }}>
						Car Driver Mapping
					</Typography>
				</Stack>

				<Button variant="contained" sx={{ bgcolor: "#2f8c99" }}>
					Quick Map
				</Button>
			</Stack>

			<Paper sx={{ mt: 3, p: 2, borderRadius: 1 }}>
				<TextField
					fullWidth
					placeholder="Search by Car Number"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					slotProps={{
						input: {
							endAdornment: (
								<InputAdornment position="end">
									<SearchIcon />
								</InputAdornment>
							),
						},
					}}
				/>

				<Box
					sx={{
						mt: 3,
						display: "grid",
						gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr 1fr auto" },
						gap: 2,
						alignItems: "end",
					}}
				>
					<FormControl fullWidth>
						<InputLabel id="driver-city-label">Driver (City)</InputLabel>
						<Select
							labelId="driver-city-label"
							value={driverCity}
							label="Driver (City)"
							onChange={(e) => setDriverCity(e.target.value)}
						>
							{cityOptions.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl fullWidth>
						<InputLabel id="driver-dispatch-label">Driver (Dispatch Center)</InputLabel>
						<Select
							labelId="driver-dispatch-label"
							value={driverDispatchCenter}
							label="Driver (Dispatch Center)"
							onChange={(e) => setDriverDispatchCenter(e.target.value)}
						>
							{dispatchOptions.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl fullWidth>
						<InputLabel id="car-city-label">Car (City)</InputLabel>
						<Select
							labelId="car-city-label"
							value={carCity}
							label="Car (City)"
							onChange={(e) => setCarCity(e.target.value)}
						>
							{cityOptions.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<FormControl fullWidth>
						<InputLabel id="car-dispatch-label">Car (Dispatch Center)</InputLabel>
						<Select
							labelId="car-dispatch-label"
							value={carDispatchCenter}
							label="Car (Dispatch Center)"
							onChange={(e) => setCarDispatchCenter(e.target.value)}
						>
							{dispatchOptions.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<Button
						variant="contained"
						onClick={() => setIsFilterApplied(true)}
						sx={{ minHeight: 56, px: 4, bgcolor: "#2f8c99" }}
					>
						Filter
					</Button>
				</Box>

				<Stack direction="row" spacing={1} sx={{ mt: 3 }}>
					<Button
						variant={activeTab === "mapped" ? "contained" : "outlined"}
						onClick={() => setActiveTab("mapped")}
						sx={{
							textTransform: "none",
							bgcolor: activeTab === "mapped" ? "#b8dcb8" : "transparent",
							color: "#1f1f1f",
							borderColor: "#b8dcb8",
						}}
					>
						Mapped
					</Button>

					<Button
						variant={activeTab === "unmapped" ? "contained" : "outlined"}
						onClick={() => setActiveTab("unmapped")}
						sx={{
							textTransform: "none",
							bgcolor: activeTab === "unmapped" ? "#efc4c4" : "transparent",
							color: "#1f1f1f",
							borderColor: "#efc4c4",
						}}
					>
						Unmapped
					</Button>
				</Stack>

				<TableContainer sx={{ mt: 2 }}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell sx={{ fontWeight: 600 }}>Car</TableCell>
								<TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
								<TableCell sx={{ fontWeight: 600 }}>Driver Name</TableCell>
								<TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
							</TableRow>
						</TableHead>

						<TableBody>
							{filteredRows.map((row) => (
								<TableRow key={row.id}>
									<TableCell sx={{ color: "#18a690" }}>{row.car}</TableCell>
									<TableCell>{row.type}</TableCell>
									<TableCell sx={{ color: "#18a690" }}>{row.driverName}</TableCell>
									<TableCell>
										<Button variant="text" sx={{ textTransform: "none", color: "#18a690" }}>
											{row.mapped ? "Unmap" : "Map"}
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</Box>
	);
}
