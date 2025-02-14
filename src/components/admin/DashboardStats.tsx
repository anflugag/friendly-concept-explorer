
import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

const DashboardStats = () => {
  const [stats, setStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const { data, error } = await supabase
        .from('statistics')
        .select('*')
        .order('recorded_at', { ascending: false })
        .limit(10);

      if (!error && data) {
        setStats(data);
      }
      setLoading(false);
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading statistics...</div>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Statistics Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardStats;
