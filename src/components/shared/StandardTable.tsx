import styles from "./StandardTable.module.css";

type DataType = "string" | "number" | "date";

export interface StandardTableColumn {
	id: string;
	name: string;
	keyName: string;
	dataType?: DataType;
}

interface StandardTableProps<T extends Record<string, unknown>> {
	columns: StandardTableColumn[];
	data: T[];
	/** Optional row key extractor; defaults to using `row.id` or index */
	getRowKey?: (row: T, index: number) => string | number;
}

const formatValue = (value: unknown, dataType: DataType = "string") => {
	if (value === null || value === undefined) return "";

	if (dataType === "number" && typeof value === "number") {
		return value.toLocaleString("en-US", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	}

	if (dataType === "date") {
		if (value instanceof Date) return value.toLocaleDateString();
		const parsed = new Date(value as string);
		return Number.isNaN(parsed.getTime())
			? String(value)
			: parsed.toLocaleDateString();
	}

	return String(value);
};

export default function StandardTable<T extends Record<string, unknown>>({
	columns,
	data,
	getRowKey,
}: StandardTableProps<T>) {
	return (
		<table className={styles.tableWrapper}>
			<thead>
				<tr>
					{columns.map((col) => (
						<th key={col.id} className={styles.tableHeader}>
							{col.name}
						</th>
					))}
				</tr>
			</thead>
			<tbody className={styles.tableBody}>
				{data.map((row, index) => {
					const rowKey = getRowKey?.(row, index) ??
						("id" in row ? (row as { id: string | number }).id : index);

					return (
						<tr key={rowKey} className={styles.tableRow}>
							{columns.map((col) => (
								<td key={col.id} className={styles.tableData}>
									{formatValue(row[col.keyName], col.dataType)}
								</td>
							))}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}