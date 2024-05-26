import { UserLayout } from '@/layouts/user-layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { IconChevronLeft, IconChevronRight, IconCirclePlusFill, IconDotsVertical } from '@irsyadadl/paranoid';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, router } from '@inertiajs/react';
import { AlertAction } from '@/components/alert-action';
import { Button } from '@/components/ui/button';

export default function Index(props) {
    const { data: categories, meta, links } = props.categories;
    return (
        <Card>
            <div className="flex flex-col justify-between gap-y-6 p-6 md:flex-row md:items-center md:gap-y-0">
                <CardHeader className="p-0">
                    <CardTitle>Daftar Daerah Kuliner</CardTitle>
                    <CardDescription>{meta.total} daerah kuliner ditemukan pada aplikasi</CardDescription>
                </CardHeader>
                <Button asChild>
                    <Link href={route('categories.create')}>
                        <IconCirclePlusFill className="mr-2 size-4" />
                        Tambah
                    </Link>
                </Button>
            </div>
            <CardContent className="p-0 [&_td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6 [&_thead]:border-t">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Masakan</TableHead>
                            <TableHead />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {categories.map((category, index) => (
                            <TableRow key={category.id}>
                                <TableCell>{meta.from + index}</TableCell>
                                <TableCell>
                                    <Link href={route('categories.show', [category])}>{category.name}</Link>
                                </TableCell>
                                <TableCell>{category.slug}</TableCell>
                                <TableCell>{category.articles_count}</TableCell>
                                <TableCell>
                                    <div className="flex justify-end">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <IconDotsVertical className="size-4" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-48">
                                                <DropdownMenuLabel>Article ID: {category.id}</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem asChild>
                                                    <Link href={route('categories.edit', [category])}>Edit</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuGroup>
                                                    <AlertAction
                                                        trigger={
                                                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                                Hapus
                                                            </DropdownMenuItem>
                                                        }
                                                        title="Hapus Daerah Kuliner"
                                                        description="Apakah anda yakin ingin menghapus daerah kuliner ini?"
                                                        action={() =>
                                                            router.delete(route('categories.destroy', [category]), {
                                                                preserveScroll: true,
                                                            })
                                                        }
                                                    />
                                                </DropdownMenuGroup>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter className="justify-between border-t pt-6 text-sm text-muted-foreground">
                <span>
                    Showing {meta.from} of {meta.total} categories.
                </span>
                {meta.has_pages && (
                    <div className="flex items-center gap-x-1">
                        <Button asChild size="sm" variant="outline">
                            {links.prev ? (
                                <Link href={links.prev}>
                                    <IconChevronLeft className="-ml-1 mr-1 size-4" />
                                    Prev
                                </Link>
                            ) : (
                                <span>Prev</span>
                            )}
                        </Button>
                        <Button asChild size="sm" variant="outline">
                            {links.next ? (
                                <Link href={links.next}>
                                    Next
                                    <IconChevronRight className="-mr-1 ml-1 size-4" />
                                </Link>
                            ) : (
                                <span>Next</span>
                            )}
                        </Button>
                    </div>
                )}
            </CardFooter>
        </Card>
    );
}

Index.layout = (page) => <UserLayout title="Daerah Kuliner" children={page} />;
