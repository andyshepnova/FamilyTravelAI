import InspirationWorkflow from '../InspirationWorkflow';

export default function InspirationWorkflowExample() {
  const handleGetInspiration = (params: any) => {
    console.log('Getting inspiration with params:', params);
  };
  
  return (
    <div className="p-4">
      <InspirationWorkflow onGetInspiration={handleGetInspiration} />
    </div>
  );
}
