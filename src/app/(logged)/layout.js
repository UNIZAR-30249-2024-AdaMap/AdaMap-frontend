import Layout from "@/components/layout";

export default function RootLayout({ children, params }) {
  return (
    <div>
      <Layout />
      <div className="pt-24 ">
        {children}
      </div>
    </div>
  );
}
