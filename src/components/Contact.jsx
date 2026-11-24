import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function Contact() {
  const { contactId } = useParams();
  const history = useHistory();
  const queryClient = useQueryClient()

  const API = "https://688247fb66a7eb81224e18ff.mockapi.io/fihrist/api/contact/"


  const { data: contact } = useQuery({
    queryKey: ["contact", contactId],
    queryFn: () => axios.get(API + contactId)
      .then(res => res.data)
  })


  const deleteMutation = useMutation({
    mutationFn: () => axios.delete(API + contactId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] })
      history.push("/")
    }
  })

  const delete1 = () => {
    deleteMutation.mutate();
  }


  if (!contact) return "Böyle bir kullanıcı yok";

  return (
    <div id="contact" className="max-w-2xl flex gap-8 items-center">
      <div>
        <img
          key={contact.avatar}
          src={contact.avatar || null}
          className="w-48 h-48 bg-[#c8c8c8] rounded-3xl object-cover"
        />
      </div>

      <div className="flex-1">
        <h1
          data-testid="full_name"
          className="text-3xl font-bold m-0 leading-tight"
        >
          {contact.first_name || contact.last_name ? (
            <>
              {contact.first_name} {contact.last_name}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
        </h1>

        {contact.email && (
          <p className="m-0">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={`mailto:${contact.email}`}
            >
              {contact.email}
            </a>
          </p>
        )}

        <div className="mt-6">
          <button className="text-red-500" onClick={delete1}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
