interface PostItemProps {
    userId?: string;
    postId?: string;
    body?: string;
    header?: string;
    footer?: string;
}

export default function PostItem({
    userId,
    postId,
    body,
    header,
    footer,
}: PostItemProps): any {
    return <div>PostItem</div>;
}
