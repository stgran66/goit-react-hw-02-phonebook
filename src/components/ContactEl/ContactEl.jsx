export const ContactEl = ({ contact, onDelete }) => {
  return (
    <li>
      {contact.name}: {contact.number}
      <button
        type="button"
        onClick={() => {
          onDelete(contact.id);
        }}
      >
        Delete
      </button>
    </li>
  );
};
