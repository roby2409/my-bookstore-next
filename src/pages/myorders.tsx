import { LayoutDashboard } from "../components/layouts/LayoutDashboard";
import Text from "@/components/atoms/Text";

export default function Dashboard() {
  return (
    <LayoutDashboard>
      <div className="w-full bg-white">
        <Text>My orders</Text>
      </div>
    </LayoutDashboard>
  );
}
