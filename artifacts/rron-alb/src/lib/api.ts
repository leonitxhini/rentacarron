const API_BASE = import.meta.env.VITE_API_URL ?? "";

export interface Car {
  id: number;
  name: string;
  brand: string;
  model: string;
  year: number;
  bodyType: string;
  pricePerDay: string;
  seats: number;
  transmission: string;
  fuel: string;
  image: string | null;
  available: boolean;
}

export async function getCars(): Promise<Car[]> {
  const res = await fetch(`${API_BASE}/api/cars`);
  if (!res.ok) throw new Error("Failed to fetch cars");
  return res.json();
}
