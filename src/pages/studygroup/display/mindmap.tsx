import React from 'react';

interface MindmapProps {
    // Define the props for your mindmap component here
}

const Mindmap: React.FC<MindmapProps> = (props) => {
    // Implement your mindmap component logic here

    return (
        <div>
            <iframe src="/path/to/your/html/file.html" width="100%" height="500px" title="HTML File"></iframe>
            <div>
                {/* Render your comment section here */}
            </div>
        </div>
    );
};

export default Mindmap;