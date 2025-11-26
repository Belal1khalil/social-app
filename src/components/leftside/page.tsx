
import  Link  from 'next/link';



export default function LeftSide() {
  return <>
   <aside
            style={{
              background: "gray",
              width: "50%",
              height: "100vh",
              padding: 20,
              boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header Section with Icon */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 20,
                paddingBottom: 10,
                borderBottom: "1px solid #ccc",
              }}
            >
              <span
                style={{
                  fontSize: "24px",
                  marginRight: 10,
                }}
              >
                🍽️
              </span>
              <h2
                style={{
                  margin: 0,
                  color: "white",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Social Recipe App
              </h2>
            </div>

            {/* Navigation List */}
            <ul
              style={{
                padding: "15px",
                listStyleType: "none",
                margin: 0,
                borderRadius: "8px",
                flexGrow: 1,
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                 gap:"15px"
              }}
            >
              <li style={{ marginBottom: "10px" }}>
                <Link
                  href="/"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontSize: "18px",
                    fontWeight: "bold",
                    display: "block",
                    padding: "10px",
                    borderRadius: "4px",
                    transition: "background 0.3s ease",
                  }}
          
                >
                  Home
                </Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link
                  href="/profile"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontSize: "18px",
                    fontWeight: "bold",
                    display: "block",
                    padding: "10px",
                    borderRadius: "4px",
                    transition: "background 0.3s ease",
                  }}
           
                >
                  Profile
                </Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link
                  href="/messages"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontSize: "18px",
                    fontWeight: "bold",
                    display: "block",
                    padding: "10px",
                    borderRadius: "4px",
                    transition: "background 0.3s ease",
                  }}
          
                >
                  Messages
                </Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link
                  href="/explore"
                  rel="noopener noreferrer"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontSize: "18px",
                    fontWeight: "bold",
                    display: "block",
                    padding: "10px",
                    borderRadius: "4px",
                    transition: "background 0.3s ease",
                  }}
         
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  href="/saved"
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontSize: "18px",
                    fontWeight: "bold",
                    display: "block",
                    padding: "10px",
                    borderRadius: "4px",
                    transition: "background 0.3s ease",
                  }}
                  
                >
                  Saved
                </Link>
              </li>
            </ul>

            {/* Logout at the Bottom */}
            <div
              style={{
                marginTop: "auto",
                paddingTop: 10,
                borderTop: "1px solid #ccc",
              }}
            >
              <Link
                href="/logout"
                style={{
                  color: "white",
                  textDecoration: "none",
                  fontSize: "18px",
                  fontWeight: "bold",
                  display: "block",
                  padding: "10px",
                  borderRadius: "4px",
                  background: "red",
                  textAlign: "center",
                  transition: "background 0.3s ease",
                }}
            
              >
                Logout
              </Link>
            </div>
          </aside>
  
  </>
    
  
}
