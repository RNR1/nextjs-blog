import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import PostData from '../../models/Post'

interface Props {
	postData: PostData
}

export default function Post({
	postData: { title, date, contentHtml }
}: Props) {
	return (
		<Layout>
			<Head>
				<title>{title}</title>
			</Head>
			<article>
				<h1 className={utilStyles.headingXl}>{title}</h1>
				<div className={utilStyles.lightText}>
					<Date dateString={date} />
				</div>
				<div dangerouslySetInnerHTML={{ __html: contentHtml }}></div>
			</article>
		</Layout>
	)
}

export async function getStaticPaths() {
	const paths = getAllPostIds()
	return {
		paths,
		fallback: false
	}
}

export async function getStaticProps({ params }) {
	const postData = await getPostData(params.id)
	return {
		props: {
			postData
		}
	}
}
