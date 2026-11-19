export function matchesSearch(record, search) {
  return JSON.stringify(record).toLowerCase().includes(search.trim().toLowerCase());
}

export function downloadCsv(fileName, rows) {
  const csv = rows
    .map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(","))
    .join("\n");
  const link = document.createElement("a");
  link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(link.href);
}
