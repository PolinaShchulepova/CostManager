import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import * as PropTypes from "prop-types";

class CategoryPieChart extends React.Component {
    render() {
        let { entries } = this.props; // Destructure entries from props
        console.log("Entries in CategoryPieChart:", entries);

        // Define colors for each category
        const colors = [
            "#7cdfdf",
            "#ff47a6",
            "#F9B7D4",
            "#cb85cd",
            "#E3B79B"
        ];

        // Process data to sum up values by category
        const data = entries.reduce((acc, entry) => {
            const existingCategory = acc.find((item) => item.category === entry.category); // Check if the category already exists
            if (existingCategory) {
                existingCategory.value += entry.amount; // Add amount to the existing category
            } else {
                acc.push({ category: entry.category, value: entry.amount }); // Add a new category with its value
            }
            return acc;
        }, []);

        return (
            <div style={{ width: "100%", maxWidth: "400px", margin: "10px auto", padding: "0" }}>
                <h2 style={{ margin: "10px" }}>Expenses by Category</h2>

                {/* Pie chart component */}
                <PieChart
                    series={[
                        {
                            // Map data for rendering in the pie chart
                            data: data.map((item, index) => ({
                                id: item.category,
                                value: item.value,
                                label: item.category,
                                color: colors[index % colors.length],
                            })),
                            labelPosition: "outside",
                            innerRadius: 0,
                            labelLine: true,
                            outerRadius: 140,
                        },
                    ]}
                    height={385}
                    width={500}
                />
            </div>
        );
    }
}

// Define prop types for the component
CategoryPieChart.propTypes = {
    entries: PropTypes.array.isRequired, // Array of expense entries is required
};

export default CategoryPieChart;
