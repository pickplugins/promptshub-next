"use client";
import { Component, useContext, useEffect, useState } from "react";

import {
	IconCheckbox,
	IconSquare,
	IconArrowNarrowLeftDashed,
	IconArrowNarrowRightDashed,
	IconRefresh,
	IconLink,
	IconSortDescending,
	IconSortAscending,
} from "@tabler/icons-react";
import Link from 'next/link';
import Spinner from "./Spinner";

import { useCounterStore } from '/store/useCounterStore'


const EntriesArchive = (props) => {

	const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
	const { appData, notifications, addNotification, cartItems, addCartItems, removeCartItems, resetCartItems, updateCartItems, userDataX, setUserDataX } = useCounterStore()


	var onRefreshRequest = props.onRefreshRequest;
	var onSelectRows = props.onSelectRows;
	var onChange = props.onChange;
	var columns = props.columns;
	var entries = props.entries;
	var itemPath = props.itemPath;
	var deleteRow = props.deleteRow;
	var loading = props.loading;
	var [queryPrams, setqueryPrams] = useState(props.queryPrams);
	var [selectedRows, setselectedRows] = useState(props.selectedRows);
	var [selectedAll, setselectedAll] = useState(false);
	var [anchorId, setAnchorId] = useState(null);
	var [lastCheckedId, setLastCheckedId] = useState(null);
	var [terms, setterms] = useState([]);

	useEffect(() => {



		onChange(queryPrams);
	}, [queryPrams]);

	useEffect(() => {
		if (onSelectRows) {
			onSelectRows(selectedRows);
		}
	}, [selectedRows]);

	const handleRowSelection = (entryId, shiftKey) => {
		var selectedRowsX = [...selectedRows];

		if (shiftKey && lastCheckedId !== null) {
			const currentIndex = entries.posts.findIndex(
				(entry) => entry.id === entryId
			);
			const lastIndex = entries.posts.findIndex(
				(entry) => entry.id === lastCheckedId
			);
			const [start, end] = [
				Math.min(currentIndex, lastIndex),
				Math.max(currentIndex, lastIndex),
			];

			// Clear previous selections
			selectedRowsX = [];

			// Select all items in range
			entries.posts.slice(start, end + 1).forEach((entry) => {
				selectedRowsX.push(entry.id);
			});
		} else {
			const index = selectedRowsX.indexOf(entryId);
			if (index !== -1) {
				selectedRowsX.splice(index, 1);
				setAnchorId(null);
			} else {
				selectedRowsX.push(entryId);
				setAnchorId(entryId);
			}
		}

		setLastCheckedId(entryId);
		setselectedRows(selectedRowsX);
	};



	var [queryTerms, setqueryTerms] = useState({ taxonomy: 'prompt_cat', keyword: "", paged: 1, per_page: 20, order: "ASC", price: "" });



	function fetchTerms() {






		var postData = {
			taxonomy: queryTerms.taxonomy,
			per_page: queryTerms.per_page,
			paged: queryTerms.paged,
			order: queryTerms.order,
			hierarchical: true,
		};
		postData = JSON.stringify(postData);

		fetch(serverUrl + "wp-json/promptshub/v2/get_terms", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json',
				// 'Authorization': `Bearer ${token}`
			},
			body: postData,
		})
			.then((response) => {

				if (!response.ok) {
					throw new Error('Token validation failed');
				}

				if (response.ok && response.status < 400) {
					response.json().then((res) => {


						var terms = res?.terms;
						var total = res?.total;
						var max_pages = res?.max_pages;




						var termsX = [];

						Object.entries(terms).map(args => {
							var index = args[0]
							var item = args[1]
							termsX.push(item)
						})


						setterms(termsX)


						setTimeout(() => {
						}, 500);
					});
				}
			})
			.catch((_error) => {
				//this.saveAsStatus = 'error';
				// handle the error
			});

	}

	useEffect(() => {
		//fetchTerms();
	}, []);





	return (
		<div className="w-full  p-5 ">
			<div className=" ">


				<div className="hidden p-3 flex justify-between  flex-wrap gap-3 px-5 bg-[#ffcbb3]   rounded-md">
					<div className="flex flex-wrap gap-3 items-center">
						<input
							className="!border-2 border-solid !border-[#783009] !shadow-none"
							type="text"
							placeholder={("Search")}
							value={queryPrams?.keyword}
							onChange={(ev) => {
								setqueryPrams({ ...queryPrams, keyword: ev.target.value, paged: 1 });
							}}
						/>




						<div className="text-red-400 cursor-pointer" onClick={ev => {
							setqueryPrams({ ...queryPrams, category: null, paged: 1, tag: null });

						}}>Reset</div>

					</div>



					<div className="flex flex-wrap gap-3 items-center ">
						{loading && (
							<>
								<Spinner />
							</>
						)}

						<div> {entries?.total} {("Items")}</div>

						<div>
							{queryPrams?.paged} / {entries?.maxPages}
						</div>

						{onRefreshRequest && (

							<div
								onClick={() => {
									onRefreshRequest();
								}}
								className="!border-2 border-solid !border-[#783009] !shadow-none px-2 py-1 rounded-sm cursor-pointer">
								<IconRefresh />
							</div>
						)}

						<select
							name=""
							id=""
							className="!border-2 border-solid !border-[#783009] !shadow-none"
							value={queryPrams?.order}
							onChange={(ev) => {
								setqueryPrams({ ...queryPrams, order: ev.target.value });




							}}>
							<option value="DESC">{("DESC")}</option>
							<option value="ASC">{("ASC")}</option>
						</select>

						<select
							name=""
							id=""
							className="!border-2 border-solid !border-[#783009] !shadow-none"
							value={queryPrams?.per_page}
							onChange={(ev) => {
								setqueryPrams({ ...queryPrams, per_page: ev.target.value });
							}}>
							<option value="10">10</option>
							<option value="20">20</option>
							<option value="50">50</option>
							<option value="100">100</option>
							<option value="200">200</option>
						</select>

						<div className="
					flex items-center gap-3 ">
							<div
								className="!border-2 border-solid border-[#783009] !shadow-none px-2 py-1 rounded-sm cursor-pointer"
								onClick={(ev) => {
									var paged = queryPrams.paged;


									if (paged == 1) return;
									setqueryPrams({ ...queryPrams, paged: queryPrams.paged - 1 });
								}}>
								<IconArrowNarrowLeftDashed />
							</div>

							<div>
								<input className="!border-2 border-solid !border-[#783009] !shadow-none px-2 py-1 rounded-sm cursor-pointer w-16 text-center" type="text" value={queryPrams.paged} onChange={ev => {
									var value = parseInt(ev.target.value)
									var paged = value;



									if (paged > entries?.maxPages) return;
									setqueryPrams({ ...queryPrams, paged: paged });

								}} />
							</div>

							<div
								className="!border-2 border-solid border-[#783009] !shadow-none px-2 py-1 rounded-sm cursor-pointer"
								onClick={(ev) => {
									var paged = queryPrams.paged + 1;



									if (paged > entries?.maxPages) return;
									setqueryPrams({ ...queryPrams, paged: paged });
								}}>
								<IconArrowNarrowRightDashed />
							</div>
						</div>
					</div>
				</div>

				<div className="overflow-x-auto w-full my-10 ">
					<div className=" w-full text-center border-collapse">

						<div className="grid grid-cols-1 xl:grid-cols-6 lg:grid-cols-2 gap-4">


							{(entries == null || entries.posts?.length == 0) && (

								<div colSpan={Object.entries(columns)?.length} className="col-span-4 py-3 text-white">
									{("No items found")}
								</div>

							)}
							{entries?.posts?.map((entry, loopIndex) => {
								return (
									<div
										key={loopIndex}
										className=" ">
										{Object.entries(columns).map((args, index) => {
											var columnIndex = args[0];
											var columnData = args[1];

											var linkTo = columnData?.linkTo
											var linkToPath = linkTo?.path;
											var callback = columnData?.callback;



											return (

												<div key={index}>
													{callback && (
														<>{callback(entry, columnIndex, loopIndex)}</>
													)}

												</div>


											);
										})}

									</div>
								);
							})}
						</div>

					</div>
				</div>

				<div className=" p-3 flex justify-between  flex-wrap gap-3 px-5 bg-[#ffcbb3]   rounded-md">
					<div className="flex flex-wrap gap-3 items-center">

					</div>

					<div className="flex flex-wrap gap-3 items-center ">
						{loading && (
							<>
								<Spinner />
							</>
						)}

						<div> {entries?.total} {("Items")}</div>

						<div>
							{queryPrams?.paged} / {entries?.maxPages}
						</div>

						{onRefreshRequest && (

							<div
								onClick={() => {
									onRefreshRequest();
								}}
								className="!border-2 border-solid !border-[#783009] !shadow-none px-2 py-1 rounded-sm cursor-pointer">
								<IconRefresh />
							</div>
						)}

						<select
							name=""
							id=""
							className=""
							value={queryPrams?.order}
							onChange={(ev) => {
								setqueryPrams({ ...queryPrams, order: ev.target.value });




							}}>
							<option value="DESC">{("DESC")}</option>
							<option value="ASC">{("ASC")}</option>
						</select>

						<select
							name=""
							id=""
							className=""
							value={queryPrams?.per_page}
							onChange={(ev) => {
								setqueryPrams({ ...queryPrams, per_page: ev.target.value });
							}}>
							<option value="10">10</option>
							<option value="20">20</option>
							<option value="50">50</option>
							<option value="100">100</option>
							<option value="200">200</option>
						</select>

						<div className="
					flex items-center gap-3 ">
							<div
								className="!border-2 border-solid border-[#783009] !shadow-none px-2 py-1 rounded-sm cursor-pointer"
								onClick={(ev) => {
									var paged = queryPrams.paged;


									if (paged == 1) return;
									setqueryPrams({ ...queryPrams, paged: queryPrams.paged - 1 });
								}}>
								<IconArrowNarrowLeftDashed />
							</div>

							<div>
								<input className=" px-2 py-1 rounded-sm cursor-pointer w-16 text-center" type="text" value={queryPrams.paged} onChange={ev => {
									var value = parseInt(ev.target.value)
									var paged = value;



									if (paged > entries?.maxPages) return;
									setqueryPrams({ ...queryPrams, paged: paged });

								}} />
							</div>

							<div
								className="!border-2 border-solid border-[#783009] !shadow-none px-2 py-1 rounded-sm cursor-pointer"
								onClick={(ev) => {
									var paged = queryPrams.paged + 1;



									if (paged > entries?.maxPages) return;
									setqueryPrams({ ...queryPrams, paged: paged });
								}}>
								<IconArrowNarrowRightDashed />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};









export default EntriesArchive;
