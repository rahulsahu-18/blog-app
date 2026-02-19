import BlogList from "@/components/BlogList"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import NavBar from "@/components/NavBar"
import Newsletter from "@/components/NewsLetter"


function Home() {
  return (
    <>
        <NavBar/>
        <Header/>
        <BlogList/>
        <Newsletter/>
        <Footer/>
    </>
  )
}

export default Home