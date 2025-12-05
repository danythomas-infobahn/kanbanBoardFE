import { useMemo } from "react";
import PropTypes from "prop-types";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from "recharts";
import "../../../design/scss/operations.scss";

// Generate dummy KPI data
const generateKPIData = () => {
  const performanceMetrics = [
    { name: "On-Time Delivery", value: 85, target: 90, color: "#10b981" },
    { name: "Customer Satisfaction", value: 78, target: 85, color: "#3b82f6" },
    { name: "Efficiency", value: 92, target: 88, color: "#8b5cf6" },
    { name: "Quality Score", value: 88, target: 90, color: "#f59e0b" },
    { name: "Cost Management", value: 75, target: 80, color: "#ef4444" },
  ];

  const statusDistribution = [
    { name: "Excellent", value: 35, color: "#10b981" },
    { name: "Good", value: 40, color: "#3b82f6" },
    { name: "Average", value: 20, color: "#f59e0b" },
    { name: "Needs Improvement", value: 5, color: "#ef4444" },
  ];

  const monthlyTrend = [
    { month: "Jan", performance: 72, target: 80 },
    { month: "Feb", performance: 75, target: 80 },
    { month: "Mar", performance: 78, target: 80 },
    { month: "Apr", performance: 82, target: 82 },
    { month: "May", performance: 85, target: 85 },
    { month: "Jun", performance: 88, target: 88 },
  ];

  const categoryPerformance = [
    { category: "Operations", score: 85 },
    { category: "Customer Service", score: 78 },
    { category: "Quality", score: 92 },
    { category: "Financial", score: 75 },
    { category: "Innovation", score: 88 },
  ];

  return {
    performanceMetrics,
    statusDistribution,
    monthlyTrend,
    categoryPerformance,
  };
};

function KPI({ card, formValues, handleChange }) {
  const cardColor = card?.color || "#2A00FF";
  const kpiData = useMemo(() => generateKPIData(), []);

  const COLORS = [
    cardColor || "#2A00FF",
    "#10b981",
    "#3b82f6",
    "#f59e0b",
    "#8b5cf6",
    "#ef4444",
    "#06b6d4",
  ];

  return (
    <div className="operation-wrapper" style={{ "--card-color": cardColor }}>
      <div className="operation-content-container">
        <div className="operation-right">
          <div className="cardform-left-full kpi-content-wrapper">
            <div className="kpi-header">
              <h3 className="kpi-title">
                <span className="kpi-title-bar"></span>
                KEY PERFORMANCE INDICATORS
              </h3>
            </div>

            {/* Charts Grid */}
            <div className="kpi-charts-grid">
              {/* Pie Chart - Status Distribution */}
              <div className="kpi-chart-section" tabIndex="-1">
                <div className="kpi-chart-container">
                  <h4 className="kpi-chart-title">Performance Status Distribution</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={kpiData.statusDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {kpiData.statusDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Line Chart - Monthly Trend */}
              <div className="kpi-chart-section" tabIndex="-1">
                <div className="kpi-chart-container">
                  <h4 className="kpi-chart-title">Monthly Performance Trend</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={kpiData.monthlyTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                      <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="performance"
                        stroke={cardColor || "#2A00FF"}
                        strokeWidth={3}
                        name="Performance"
                        dot={{ fill: cardColor || "#2A00FF", r: 5 }}
                        activeDot={{ r: 7 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="target"
                        stroke="#94a3b8"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Target"
                        dot={{ fill: "#94a3b8", r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bar Chart - Category Performance */}
              <div className="kpi-chart-section" tabIndex="-1">
                <div className="kpi-chart-container">
                  <h4 className="kpi-chart-title">Category Performance</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={kpiData.categoryPerformance}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="category" tick={{ fontSize: 11 }} angle={-45} textAnchor="end" height={100} />
                      <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="score" fill={cardColor || "#2A00FF"} radius={[8, 8, 0, 0]} name="Score" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bar Chart - Performance vs Target */}
              <div className="kpi-chart-section" tabIndex="-1">
                <div className="kpi-chart-container">
                  <h4 className="kpi-chart-title">Performance vs Target</h4>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={kpiData.performanceMetrics}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={120} />
                      <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill={cardColor || "#2A00FF"} radius={[8, 8, 0, 0]} name="Current" />
                      <Bar dataKey="target" fill="#94a3b8" radius={[8, 8, 0, 0]} name="Target" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

KPI.propTypes = {
  card: PropTypes.object,
  formValues: PropTypes.object,
  handleChange: PropTypes.func,
};

export default KPI;
