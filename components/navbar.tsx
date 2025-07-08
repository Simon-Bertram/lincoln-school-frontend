import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex  h-16">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0">
              <img className="h-8 w-8" src="/globe.svg" alt="Logo" />
            </div>
            <div className="flex-1">
              <Input type="text" placeholder="Search..." />
            </div>

            <div className="flex-1">
              <RadioGroup>
                <div className="flex items-center gap-3">
                  <RadioGroupItem id="card-view" value="card">
                    Card View
                  </RadioGroupItem>
                  <Label htmlFor="card-view">Card View</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem id="table-view" value="table">
                    Table View
                  </RadioGroupItem>
                  <Label htmlFor="table-view">Table View</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
