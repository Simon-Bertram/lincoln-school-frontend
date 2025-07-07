import { Input } from "@/components/ui/input";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-8 w-8" src="/globe.svg" alt="Logo" />
            </div>
            <div className="flex-1">
              <Input type="text" placeholder="Search..." />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
