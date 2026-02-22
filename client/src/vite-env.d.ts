interface Blog {
    title:string,
    subTitle:string,
    image:string,
    description:string,
    isPublished:boolean
}

interface DashboardData {
    blogs:number,
    comments:number,
    drafts:number,
    recentBlogs:Blog[]
}