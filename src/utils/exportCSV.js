import fs from "fs";

export function exportEarningsCSV(records, filename) {
  const header = "User,Provider,Date,NetUSD\n";
  const rows = records.map(r =>
    `${r.userId},${r.provider.name},${r.date.toISOString()},${r.netAmountUSD}`
  );

  fs.writeFileSync(filename, header + rows.join("\n"));
}