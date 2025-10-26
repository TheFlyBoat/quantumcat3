
"use strict";
// This file is a workaround to allow re-exporting all of lucide-react
// while also being able to add custom icons if needed in the future.
// It uses CommonJS syntax to be compatible with Next.js.
const lucide = require("lucide-react");
module.exports = lucide;

// Example of how to add a custom icon in the future:
// module.exports.MyCustomIcon = (props) => (
//   <svg {...props}>...</svg>
// );
