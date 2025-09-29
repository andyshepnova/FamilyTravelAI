import LinkValidationBadge from '../LinkValidationBadge';

export default function LinkValidationBadgeExample() {
  return (
    <div className="flex flex-col space-y-4 p-4">
      <div>
        <h3 className="font-medium mb-2">Link Status Examples</h3>
        <div className="flex space-x-2">
          <LinkValidationBadge status="verified" />
          <LinkValidationBadge status="checking" />
          <LinkValidationBadge status="failed" />
        </div>
      </div>
    </div>
  );
}
